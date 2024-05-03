import express from "express"

export function sendResponse(
  res: express.Response,
  success: boolean,
  message: string,
  data?: any,
) {
  res.json({
    success,
    message,
    data,
  })
}
