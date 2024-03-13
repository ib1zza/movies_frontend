import s from "../Auth.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";
import {Input} from "@shared/ui/Input/Input.tsx";
import {signUp, verifyEmail} from "@shared/API/AccountsService.ts";

interface RegisterProps {
    className?: string
}

export interface RegisterData {
    email: string
    password: string
    username: string
    repeat_password: string
}

const Register = ({className}: RegisterProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        watch
    } = useForm<RegisterData>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    async function onRegister(data: RegisterData) {
        console.log(data);
        try {
            const res1 = await signUp(data);
            const res2 = await verifyEmail(data.email);
            console.log(res1, res2)
        } catch (err) {
            console.log(err)
        }

    }

    const password = watch("password");

    console.log(errors)

    console.log(getValues())

    return (
        <div className={classNames(s.Login, {}, [className])}>
            <h1 className={s.title}>Регистрация</h1>

            <form className={s.form} onSubmit={handleSubmit(onRegister)}>
                <Input {...register("email", {
                    required: {
                        value: true,
                        message: "Поле обязательно для заполнения"
                    }, pattern: /^\S+@\S+$/i,
                })} type="email" placeholder="Email" error={errors.email} label="Email"/>
                <Input {...register("username", {
                    required: {
                        value: true,
                        message: "Поле обязательно для заполнения"
                    }, minLength: 3, maxLength: 20,
                })} type="text" placeholder="Номер телефона" error={errors.username} label="Номер телефона"/>
                <Input {...register("password", {required: {
                        value: true,
                        message: "Поле обязательно для заполнения"
                    }, minLength: 7, maxLength: 31,})} type="password"
                       placeholder="Пароль" error={errors.password} label="Пароль"/>
                <Input {...register("repeat_password", {
                    deps: "password",
                    required: {
                        value: true,
                        message: "Поле обязательно для заполнения"
                    },
                    validate: (value) => value === password || "Пароли должны совпадать"
                })} type="password" placeholder="Повторите пароль" error={errors.repeat_password} label="Повторите пароль"/>
                <button type="submit">Зарегистрироваться</button>
            </form>

            <p className={s.bottomText}>
                <span>Уже есть аккаунт? <Link to={AppRoutes.LOGIN} className={s.link}>Вход</Link></span>
            </p>
        </div>
    );
};

export {Register};
