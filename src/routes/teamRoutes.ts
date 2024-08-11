import { IncomingMessage, ServerResponse } from "http";
import { TeamController } from "../controllers/teamController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const teamRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

   // Middleware function to handle authentication
   const handleRequestWithAuth = (
    controllerAction: (req: IncomingMessage, res: ServerResponse) => void
  ) => {
    authenticateToken(req, res, () => {
      controllerAction(req, res);
    });
  };

  if (method === "GET" && url! === "/teams/most-wins") {
    return handleRequestWithAuth(TeamController.mostWins);
  } else if (method === "GET" && url! === "/teams/most-podiums") {
    return handleRequestWithAuth(TeamController.mostPodiums);
  } else if (method === "GET" && url?.startsWith("/teams")) {
    return handleRequestWithAuth(TeamController.searchTeams);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
};
