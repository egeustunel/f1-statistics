import { IncomingMessage, ServerResponse } from "http";
import { DriverController } from "../controllers/driverController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const driverRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  // Middleware function to handle authentication
  const handleRequestWithAuth = (
    controllerAction: (req: IncomingMessage, res: ServerResponse) => void
  ) => {
    authenticateToken(req, res, () => {
      controllerAction(req, res);
    });
  };

  if (method === "GET" && url! == "/drivers/most-wins") {
    return handleRequestWithAuth(DriverController.mostWins);
  } else if (method === "GET" && url === "/drivers/podium-counts") {
    return handleRequestWithAuth(DriverController.podiumCounts);
  } else if (method === "GET" && url! === "/drivers/dnf-counts") {
    return handleRequestWithAuth(DriverController.dnfCounts);
  } else if (method === "GET" && url?.startsWith("/drivers")) {
    return handleRequestWithAuth(DriverController.searchDrivers);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
};
