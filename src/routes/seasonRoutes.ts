import { IncomingMessage, ServerResponse } from "http";
import { SeasonController } from "../controllers/seasonController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const seasonRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  const handleRequestWithAuth = (
    controllerAction: (req: IncomingMessage, res: ServerResponse) => void
  ) => {
    authenticateToken(req, res, () => {
      controllerAction(req, res);
    });
  };

  if (method === "GET" && url! === "/seasons/most-podiums") {
    return handleRequestWithAuth(SeasonController.mostPodiums);
  } else if (method === "GET" && url! === "/seasons/most-wins") {
    return handleRequestWithAuth(SeasonController.mostWins);
  } else if (method === "GET" && url?.startsWith("/seasons")) {
    return handleRequestWithAuth(SeasonController.searchSeasons);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
};
