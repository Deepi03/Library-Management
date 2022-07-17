import { Router, Response, Request } from "express";

const authorRoute = Router();

authorRoute.get("", (req: Request, res: Response) => {
  res.send({
    message: "Get from author Route",
    status: 200
  });
});
authorRoute.post("", (req: Request, res: Response) => {
  res.send(req.body);
});
authorRoute.put("", (req: Request, res: Response) => {
  res.send(req.body);
});
authorRoute.delete("/", (req: Request, res: Response) => {
  res.send({
    message: `${req.body.name} Deleted`,
    status: 200
  });
});

authorRoute.get("/:authorId", (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  res.send({ message: `Details of author with ${authorId}` });
});

authorRoute.get("/:authorId/books", (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  res.send({
    authorId: authorId,
    message: `Books of author with  ${authorId}`,
    status: 200
  });
});

export default authorRoute;
