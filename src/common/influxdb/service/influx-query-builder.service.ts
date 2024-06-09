import { Injectable } from "@nestjs/common";
import { InfluxdbService } from "./influxdb.service";
import { SearchDTO } from "../../dto/searchDTO";
import { QueryBuilderUtil } from "../util/query-builder-util";

@Injectable()
export class InfluxQueryBuilderService {

  constructor(private readonly influxdbService: InfluxdbService) {
  }

  async buildQuery(searchDTO: SearchDTO): Promise<string> {

    // region measurement
    const measurements = await this.influxdbService.getMeasurements();
    QueryBuilderUtil.validateSearchDTOMeasurement(searchDTO, measurements);
    const measurement = searchDTO.measurement;
    // endregion

    const fields = await this.influxdbService.getFieldKeys(measurement);
    const tags = await this.influxdbService.getTagKeys(measurement);
    let query = "SELECT ";

    // region projections
    if (!searchDTO.projections || searchDTO.projections.length === 0) {
      query += `* `;
    } else {
      const queryProjections = QueryBuilderUtil.validateProjections(searchDTO.projections, fields, tags);
      QueryBuilderUtil.validateQueryProjections(queryProjections);
      query += queryProjections.join(",");
      query += " ";
    }
    query += `from "${searchDTO.measurement}" `;
    // endregion

    // region filters
    if (searchDTO.filters && searchDTO.filters.length > 0) {
      const filters = searchDTO.filters;
      query += QueryBuilderUtil.buildFiltersQuery(filters, fields, tags);
    }
    // endregion

    // region sorters
    if (searchDTO.sorter) {
      QueryBuilderUtil.validateSorter(searchDTO.sorter);
      query += `ORDER BY "time" ${searchDTO.sorter.sortDirection} `;
    }
    // endregion

    // region pagination
    if (searchDTO.pagination) {
      const paginationDTO = searchDTO.pagination;
      QueryBuilderUtil.validatePagination(paginationDTO);
      if (paginationDTO.all === false) {
        query += `LIMIT ${paginationDTO.limit} `;

        if (paginationDTO.offset) {
          query += `OFFSET ${paginationDTO.offset} `;
        }
      }
    }
    // endregion

    console.debug(query);
    return query;
  }

}