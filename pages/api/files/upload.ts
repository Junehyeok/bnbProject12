import { NextApiRequest, NextApiResponse } from "next";
import fomidable from "formidable";

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const form = new fomidable.IncomingForm();
            //parse 함수로 파일의 정보 받기
            form.parse(req, async (err, fields, files) => {
                console.log(files);
            });
        } catch (e) {
            console.log(e);
            res.end();
        }
    }
};
