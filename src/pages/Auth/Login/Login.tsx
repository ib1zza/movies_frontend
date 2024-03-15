import s from "../Auth.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";
import {Input} from "@shared/ui/Input/Input.tsx";
import {useEffect, useRef} from "react";
import {signIn} from "@shared/API/AccountsService.ts";

interface LoginProps {
    className?: string
}

interface LoginData {
    email: string
    password: string
}
const Login = ({className} : LoginProps) => {
    const api = useRef<string>("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    useEffect(() => {
        fetch('https://www.cloudflare.com/cdn-cgi/trace').then(data => data.text()).then(data => {
            const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
            const ip = data.match(ipRegex)?.[0];
            api.current = ip || '127.0.0.1';
            console.log(ip);
        });
    }, [])


    async function onLogin (data: LoginData) {
        const res = await signIn(data.email, data.password, api.current);

        localStorage.setItem("sessionId", res.session_id);

        console.log(res);

    }

    return (
        <div className={classNames(s.Login, {}, [className])}>
            <h1 className={s.title}>Вход</h1>

            <form className={s.form} onSubmit={handleSubmit(onLogin)}>
                <Input {...register("email", {required: true})} type="email" placeholder="Email"/>
                <Input {...register("password", {required: true})} type="password" placeholder="Пароль"/>
                <button type="submit">Войти</button>
            </form>

            <p className={s.bottomText}>
                <span>У вас нет аккаунта? <Link to={AppRoutes.REGISTER} className={s.link}>Регистрация</Link></span>
            </p>
        </div>
    );
};

export {Login};
