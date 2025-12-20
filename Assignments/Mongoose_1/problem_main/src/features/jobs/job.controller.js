import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { applyJobRepo } from "./job.repository.js";

export const applyJob = async (req, res, next) => {
  const job_id = req.params.id;
  const resp = await applyJobRepo(job_id, req._id);
  console.log(resp);
  if (resp.success) {
    res.status(200).json({
      success: true,
      msg: "job application apllied successfully",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
