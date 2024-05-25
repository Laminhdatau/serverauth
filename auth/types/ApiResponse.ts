import { Request } from "express";

export interface ApiResponse<T> {
          success: boolean;
          message: string;
          data?: T;
}


export interface User {
          id: number;
          username: string;
          email: string;
          password: string;
}


export interface DecodedToken {
          id: number;
          iat: number;
          exp: number;
}

export interface AuthenticatedRequest extends Request {
          user?: number;
}