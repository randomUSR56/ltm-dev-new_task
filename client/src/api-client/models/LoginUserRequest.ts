/* tslint:disable */
/* eslint-disable */
/**
 * Bcknddm API
 * API a bcknddm adatbázis tábláinak kezeléséhez. Generálva a backnddbcreate.sql alapján.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: luczialex@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LoginUserRequest
 */
export interface LoginUserRequest {
    /**
     * Felhasználó email címe
     * @type {string}
     * @memberof LoginUserRequest
     */
    email: string;
    /**
     * Felhasználó jelszava
     * @type {string}
     * @memberof LoginUserRequest
     */
    jelszo: string;
}

/**
 * Check if a given object implements the LoginUserRequest interface.
 */
export function instanceOfLoginUserRequest(value: object): value is LoginUserRequest {
    if (!('email' in value) || value['email'] === undefined) return false;
    if (!('jelszo' in value) || value['jelszo'] === undefined) return false;
    return true;
}

export function LoginUserRequestFromJSON(json: any): LoginUserRequest {
    return LoginUserRequestFromJSONTyped(json, false);
}

export function LoginUserRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginUserRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'email': json['email'],
        'jelszo': json['jelszo'],
    };
}

export function LoginUserRequestToJSON(json: any): LoginUserRequest {
    return LoginUserRequestToJSONTyped(json, false);
}

export function LoginUserRequestToJSONTyped(value?: LoginUserRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'email': value['email'],
        'jelszo': value['jelszo'],
    };
}

