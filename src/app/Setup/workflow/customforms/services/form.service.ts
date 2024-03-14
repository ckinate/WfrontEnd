import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormService {
  constructor(private httpClient: HttpClient) {}

  public getMetadata() {
    return this.httpClient.get('../../assets/testmetadata.json');
  }

  public getData() {
    return this.httpClient.get('../../assets/testdata.json');
  }

  public getDefaultMetadata() {
    return this.httpClient.get('../../assets/meta-data.json');
  }

  public getDefaultData() {
    return this.httpClient.get('../../assets/data.json');
  }
}
