import { createServer } from "http";
import { SERVER_ERROR } from "./constants";
import { IUser } from "./model/IUser";
import { router } from "./router/router";
import { sendResponse } from "./utils/utils";

export function runServer(port: number, db: IUser[]) {
    createServer(async (req, res) => {
      try {
        await router(req, res, db);
      } catch {
        sendResponse(res, 500, null, SERVER_ERROR);
      }
    }).listen(port, 'localhost', () => {
      console.log(`App has been started on port ${port}...`);
    });
  }