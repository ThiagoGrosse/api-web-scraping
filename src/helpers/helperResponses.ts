import { Response } from "express";

const sendResponse = <T>(
    res: Response,
    status: number,
    response: T,
    countResult?: number
): Response => {
    switch (status) {
        case 200:
            return res
                .status(status)
                .json({ success: true, countResult: countResult, response });
        case 400:
            return res
                .status(status)
                .json({ success: false, error: "Bad Request" });
        case 404:
            return res
                .status(status)
                .json({ success: false, error: "Not Found", response });
        case 500:
            return res
                .status(status)
                .json({ success: false, error: "Internal Server Error" });
        default:
            return res.status(status).json(response);
    }
};

export default sendResponse;
