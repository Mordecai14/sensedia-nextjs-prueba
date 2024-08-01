'use client'
import { useState, useRef, useEffect, useCallback } from "react";
import { Input, Button, CheckboxGroup, Checkbox } from "@nextui-org/react"

const wait = (time: any) => new Promise((resolve) => setTimeout(resolve, time));


export const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState({ username: '', email: '', website: '' });
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const focusRef = useRef<HTMLFormElement>(null);


    const initialState = useCallback(async () => {
        setLoading(true);
        await wait(800);
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const { username, email, website } = await response.json();
        setInitialData({ username, email, website: `https://${website}` });
        setLoading(false);
    }, [setLoading, setInitialData]);


    const reset = useCallback(() => {
        if (formRef.current) {
            formRef.current.reset();
        }
        setSelectedDays([]);
    }, [formRef]);


    const onSubmit = useCallback(
        async (event: any) => {
            setLoading(true);
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formFields = Object.fromEntries(formData);
            formFields["days"] = selectedDays.join(', ');
            console.log('Submited Data:', formFields);
            await wait(1500);
            setLoading(false);
            reset();
        },
        [setLoading, reset, selectedDays]
    );

    return (
        <div className="mt-4 border border-gray-300 rounded-lg px-4 py-8 shadow">
            <h1 className="text-sensGray">REGISTRO</h1>
            <form
                ref={formRef}
                onSubmit={(event) => onSubmit(event)}
                className="pt-8"
            >
                <div className="flex w-full gap-8 justify-between">
                    <section className="w-full flex flex-col gap-6">
                        <Input
                            type="text"
                            name="username"
                            aria-label="Username"
                            placeholder="Nombre de usuario *"
                            disabled={loading}
                            isRequired
                            color="secondary"
                            variant="underlined"
                            radius="none"
                            className="bg-gray-100"
                        // initialValue={initialData.username}
                        />
                        <Input
                            type="text"
                            name="fullname"
                            aria-label="Fullname"
                            placeholder="Nombre completo *"
                            disabled={loading}
                            isRequired
                            color="secondary"
                            variant="underlined"
                            radius="none"
                            className="bg-gray-100"
                        // initialValue={initialData.username}
                        />
                        <Input
                            type="text"
                            name="email"
                            aria-label="Email"
                            placeholder="Correo electrónico *"
                            disabled={loading}
                            isRequired
                            color="secondary"
                            variant="underlined"
                            radius="none"
                            className="bg-gray-100"
                        // initialValue={initialData.username}
                        />
                    </section>
                    <section className="w-full flex flex-col gap-6">
                        <Input
                            type="text"
                            name="city"
                            aria-label="City"
                            placeholder="Ciudad *"
                            disabled={loading}
                            isRequired
                            color="secondary"
                            variant="underlined"
                            radius="none"
                            className="bg-gray-100"
                        // initialValue={initialData.username}
                        />
                        <CheckboxGroup
                            label="DIAS DE LA SEMANA"
                            color="secondary"
                            orientation="horizontal"
                            value={selectedDays}
                            onChange={setSelectedDays}
                        >
                            <Checkbox value="monday">Lun</Checkbox>
                            <Checkbox value="tuesday">Mart</Checkbox>
                            <Checkbox value="wednesday">Miérc</Checkbox>
                            <Checkbox value="thursday">Jue</Checkbox>
                            <Checkbox value="friday">Vier</Checkbox>
                            <Checkbox value="satueday">Sáb</Checkbox>
                            <Checkbox value="sunday">Dom</Checkbox>
                        </CheckboxGroup>
                    </section>
                </div>
                <div className="flex gap-8 mt-20">
                    <Button radius="full" color={loading ? "default" : "secondary"} type="submit" disabled={loading}>{loading ? "Enviando.." : "REGISTRO"}</Button>
                    <Button variant="light" color="secondary" type="reset" onPress={() => reset()}>CANCELAR</Button>
                </div>
            </form>
        </div>
    )
}