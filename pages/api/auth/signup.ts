import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email, firstname, lastname, password, birthday } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 8);

        if (!email || !firstname || !lastname || !password || !birthday) {
            res.statusCode = 400;
            return res.send("필수 데이터가 없습니다.");
        }

        res.statusCode = 405;
        const userExist = Data.user.exist({ email });
        if (userExist) {
            res.statusCode = 409;
            res.send("이미 가입된 이메일입니다.");
        }

        const users = Data.user.getList();
        let userId;
        if (users.length === 0) {
            userId = 1;
        } else {
            userId = users[users.length - 1].id + 1;
        }
        const newUser: StoredUserType = {
            id: userId,
            email,
            firstname,
            lastname,
            password: hashedPassword,
            birthday,
            profileImage: "/static/image/user/default_user_profile_image.jpg",
        };

        Data.user.write([...users, newUser]);

        const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
        res.setHeader(
            "Set-Cookie", `access_token=${token}; expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3
              ).toISOString()} path=/; httponly`
            );
            /* encodeURI(members[0].name)
            expires=${new Date(
            Date.now() + 60 * 60 * 24 * 1000 * 3 //지금 시간 + 3일
          )};

            */
        /* typescript utility */
        const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> = newUser;

        delete newUserWithoutPassword.password;
        res.statusCode = 200;
        return res.send(newUser);
    }
    return res.end();
};
//yarn add bcryptjs
/*
1. api method가 post인지
2. req.body에 필요한 값이 전부 들어있는지
3. email 중복 여부
4. 패스워드 암호화
5. 유저정보 추가
6. 추가된 유저의 정보와 토큰 전달.
*/
