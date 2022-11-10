import { agent as _request } from "supertest";
import { get } from "../src/server";

export const request = _request(get());
