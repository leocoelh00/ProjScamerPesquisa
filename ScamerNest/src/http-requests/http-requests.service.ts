import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';

type File = Express.Multer.File;

@Injectable()
export class HttpRequestsService {
    constructor(private httpService: HttpService) { }

    async get(
        url: string,
        params?: any,
        options?: AxiosRequestConfig
    ): Promise<any> {

        try {
            const result = await this.httpService.get(url,
                {
                    params,
                    ...options
                }
            ).toPromise();
            return result.data;

        } catch (error) {
            throw new HttpException(error.response?.data, error.response?.status)
        }
    }

    async post(url: string, payload?: any, options?: AxiosRequestConfig): Promise<any> {
        try {
            const result = await this.httpService.post(url, payload, options).toPromise();
            return result.data;
        } catch (error) {
            //if (process.env.NODE_ENV === 'development') console.log(error.response);
            console.log(url, error)
            throw new HttpException(error.response?.data, error.response?.status)
        }
    }

    async put(url: string, payload?: any, aditionalHeaders?: { ip: string, token: string }): Promise<any> {
        try {
            const result = await this.httpService.put(url, payload, { headers: aditionalHeaders }).toPromise();
            return result.data;
        } catch (error) {
            //if (process.env.NODE_ENV === 'development') console.log(error.response);
            console.log(url, error)
            throw new HttpException(error.response?.data, error.response?.status)
        }
    }

    async delete(url, aditionalHeaders?: { ip: string, token: string }): Promise<any> {
        try {
            const result = await this.httpService.delete(url, { headers: aditionalHeaders }).toPromise();
            return result.data;
        } catch (error) {
            //if (process.env.NODE_ENV === 'development') console.log(error.response);
            throw new HttpException(error.response?.data, error.response?.status)
        }
    }

    async formDataPost(
        url: string,
        payload?: any,
        file?: File
    ): Promise<any> {
        let result = null;
        const { buffer, originalname } = file;
        const formData = new FormData();
        const config: AxiosRequestConfig = {};

        Object.keys(payload).forEach(key => {
            formData.append(key, payload[key]);
        });

        formData.append('arquivo', buffer, originalname);
        config.headers = { ...config.headers, ...formData.getHeaders() }

        await this.httpService.post(url, formData, {
            ...config,
            maxContentLength: 1024 * 1024 * 30,
            maxBodyLength: 1024 * 1024 * 30
        })
            .toPromise()
            .then(
                res => {
                    result = res.data;
                }
            )
            .catch(error => {
                if (process.env.NODE_ENV === 'development') console.log(error.response?.data);
                throw new HttpException(error.response?.data, error.response?.status)
            });
        return result;
    }

    async formsDataPost(
        url: string,
        files?: Express.Multer.File[]
    ): Promise<any> {
        let result = null;
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append("image", files[i].buffer, files[i].originalname)
        }

        const config = { headers: { ...formData.getHeaders() } }

        await this.httpService.post(url, formData, {
            ...config,
            maxContentLength: 1024 * 1024 * 30,
            maxBodyLength: 1024 * 1024 * 30
        })
            .toPromise()
            .then(
                res => {
                    result = res.data;
                }
            )
            .catch(error => {
                if (process.env.NODE_ENV === 'development') console.log(error.response?.data);
                throw new HttpException(error.response?.data, error.response?.status)
            });
        return result;
    }
}
