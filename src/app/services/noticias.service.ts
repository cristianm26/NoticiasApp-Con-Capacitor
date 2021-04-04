import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../pages/interfaces/interfaces';
import { environment } from '../../environments/environment';

const apikey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apikey,
});
@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  headLinesPage =0;
  categoriaActual='';
  categoriaPage=0;
  constructor(private http: HttpClient) {}
  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }
  getTopHeadlines() {
    this.headLinesPage++
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
    /* return this.http.get<RespuestaTopHeadlines>(`${apiUrl}/top-headlines?country=us&apiKey=${apikey}`) */
  }

  getTopHeadlinesCategoria(categoria: string) {
    if (this.categoriaActual=== categoria) {
        this.categoriaPage++
    }else{
      this.categoriaPage=1;
      this.categoriaActual= categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(
      `/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`
    );
    /* return this.http.get(`${apiUrl}/top-headlines?country=de&category=business&apiKey=${apikey}`) */
  }
}
