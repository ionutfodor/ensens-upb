import { SearchDTO } from "../../dto/searchDTO";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Field } from "../model/field";
import { Tag } from "../model/tag";
import { PaginationDTO } from "../../dto/paginationDTO";
import { SorterDTO } from "../../dto/sorterDTO";
import { FilterDTO } from "../../dto/filterDTO";
import { FieldTypes } from "../../enum/field-types";
import {
  AllowedBooleanOperations,
  AllowedStringOperations,
  AllowedTimeOperations,
  FilterOperation
} from "../../enum/filter-operation";
import { DateUtil } from "./date-util";
import { AllowedTimeOperators } from "../../enum/operator-enum";

export class SearchDTOUtil {

  public static validateMeasurement(searchDTO: SearchDTO, measurements: string[]): void {
    if (!searchDTO.measurement) {
      throw new BadRequestException("Measurement not specified!");
    }

    if (!measurements.includes(searchDTO.measurement)) {
      throw new NotFoundException(
        `Measurement ${searchDTO.measurement} does not exist in the database!`);
    }
  }

  public static validateProjections(projections: string[], fields: Field[], tags: Tag[]): string[] {
    return projections.map(projection => {
        const existsInFields = fields.some(field => field.fieldKey === projection);
        const existsInTags = tags.some(tag => tag.tagKey === projection);

        if (existsInFields) {
          return `"${projection}"::field`;
        }

        if (existsInTags) {
          return `"${projection}::tag"`;
        }

        if (!existsInTags && !existsInFields) {
          console.warn(`No such tag or field: ${projection}`);
          return null;
        }
    }).filter(result => result !== null);
  }

  public static validateQueryProjections(queryProjections: string[]): void {
    if (queryProjections.length === 0) {
      throw new BadRequestException("No projection exists in measurement!");
    }
  }

  public static validateSorter(sorterDTO: SorterDTO): void {
    if (!sorterDTO.sortDirection) {
      throw new BadRequestException("Sorting option is present but sorting direction is not specified!");
    }
  }

  public static validatePagination(paginationDTO: PaginationDTO): void {
    if (paginationDTO.all === undefined) {
      throw new BadRequestException("Pagination option is present but pagination mode is not specified!");
    }

    if (paginationDTO.all === false) {
      if (!paginationDTO.limit) {
        throw new BadRequestException("Pagination without limit set is not supported!");
      }
    }
  }

  public static buildFiltersQuery(filters: FilterDTO[], fields: Field[], tags: Tag[]): string {
    let filtersQuery = "WHERE ";
    let addedFilter= false;

    filters.forEach(filter => {
      if (filter.filterField === 'time') {
        return;
      }

      const existingField = fields.find(field => field.fieldKey === filter.filterField);
      const existingTag = tags.find(tag => tag.tagKey === filter.filterField);

      let filterValue: any;
      if (existingField) {
        switch (existingField.fieldType) {
          case FieldTypes.FLOAT:
            filterValue = parseFloat(filter.filterValue);
            if (isNaN(filterValue)) {
              console.warn(`Ignoring invalid filter value for: ${filter.filterField}. Required float`);
              return;
            }
            addedFilter ? filtersQuery += `${filter.operatorEnum} ` : null;
            filtersQuery += `"${filter.filterField}" ${this.resolveFilterOperation(filter.filterOperation)} ${filterValue} `;
            addedFilter = true;
            break;
          case FieldTypes.INTEGER:
            filterValue = parseInt(filter.filterValue);
            if (isNaN(filterValue)) {
              console.warn(`Ignoring invalid filter value for: ${filter.filterField}. Required integer`);
              return;
            }
            addedFilter ? filtersQuery += `${filter.operatorEnum} ` : null;
            filtersQuery += `"${filter.filterField}" ${this.resolveFilterOperation(filter.filterOperation)} ${filterValue} `;
            addedFilter = true;
            break;
          case FieldTypes.BOOLEAN:
            if (filter.filterValue !== 'true' && filter.filterValue !== 'false') {
              console.warn(`Ignoring invalid filter value for: ${filter.filterField}. Required boolean`);
              return;
            }
            if (!AllowedBooleanOperations.includes(filter.filterOperation)) {
              console.warn(`Ignoring invalid filter operation for: ${filter.filterField}. Required EQ or NOT`);
              return;
            }
            addedFilter ? filtersQuery += `${filter.operatorEnum} ` : null;
            filtersQuery += `"${filter.filterField}" ${this.resolveFilterOperation(filter.filterOperation)} ${filter.filterValue} `;
            addedFilter = true;
            break;
          case FieldTypes.STRING:
            if (!AllowedStringOperations.includes(filter.filterOperation)) {
              console.warn(`Ignoring invalid filter operation for: ${filter.filterField}. Required EQ or NOT`);
              return;
            }
            addedFilter ? filtersQuery += `${filter.operatorEnum} ` : null;
            filtersQuery += `"${filter.filterField}" ${this.resolveFilterOperation(filter.filterOperation)} '${filter.filterValue}' `;
            addedFilter = true;
            break;
        }
      } else if (existingTag) {
        if (!AllowedStringOperations.includes(filter.filterOperation)) {
          console.warn(`Ignoring invalid filter operation for: ${filter.filterField}. Required EQ or NOT`);
          return;
        }
        addedFilter ? filtersQuery += `${filter.operatorEnum} ` : null;
        filtersQuery += `"${filter.filterField}" ${this.resolveFilterOperation(filter.filterOperation)} '${filter.filterValue}' `;
        addedFilter = true;
      } else {
        console.warn(`No such tag or field: ${filter.filterField}`);
        return;
      }
    });

    filters.filter(filter => filter.filterField === 'time')
      .forEach(filter => {
        if (!DateUtil.isValidISODateTime(filter.filterValue)) {
          console.warn(`Ignoring invalid date filter with value ${filter.filterValue}`);
          return;
        }

        if (!AllowedTimeOperators.includes(filter.operatorEnum)) {
          console.warn(`Ignoring invalid date filter operator ${filter.operatorEnum}`);
          return;
        }

        if (!AllowedTimeOperations.includes(filter.filterOperation)) {
          console.warn(`Ignoring invalid date filter operation for: ${filter.filterField}. Required EQ, LT, LTE, GT, GTE`);
          return;
        }

        addedFilter ? filtersQuery += `${filter.operatorEnum} ` : null;
        filtersQuery += `time ${this.resolveFilterOperation(filter.filterOperation)} '${filter.filterValue}' `;
        addedFilter = true;
    });

    if (!addedFilter) {
      console.warn(`Filters defined but no valid filters present!`);
      return "";
    }

    return filtersQuery;
  }

  private static resolveFilterOperation(filterOperation: FilterOperation): string {
    switch (filterOperation) {
      case FilterOperation.EQ:
        return "=";
      case FilterOperation.NOT:
        return "!=";
      case FilterOperation.GT:
        return ">";
      case FilterOperation.GTE:
        return ">=";
      case FilterOperation.LT:
        return "<";
      case FilterOperation.LTE:
        return "<=";
    }
  }
}