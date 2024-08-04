"use client";
import { useState, useRef, useCallback, useMemo } from "react";
import { Input, Button, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { CreateUser } from "@/libs/types";
import { createUser } from "@/libs/actions";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [value, setValue] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

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
      const formFields = Object.fromEntries(formData) as {
        [key: string]: FormDataEntryValue;
      };

      const userData: CreateUser = {
        name: formFields.name as string,
        password: formFields.password as string,
        email: formFields.email as string,
      };

      await createUser(userData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      //TODO agregar toaastify

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
              name="password"
              aria-label="Password"
              placeholder="Nombre de usuario *"
              disabled={loading}
              isRequired
              color="secondary"
              variant="underlined"
              radius="none"
              className="bg-gray-100"
            />
            <Input
              type="text"
              name="name"
              aria-label="Name"
              placeholder="Nombre completo *"
              disabled={loading}
              isRequired
              color="secondary"
              variant="underlined"
              radius="none"
              className="bg-gray-100"
            />
            <Input
              value={value}
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "success"}
              errorMessage="Please enter a valid email"
              type="text"
              name="email"
              aria-label="Email"
              placeholder="Correo electrónico *"
              disabled={loading}
              isRequired
              variant="underlined"
              radius="none"
              className="bg-gray-100"
              onValueChange={setValue}
            />
          </section>
          <section className="w-full flex flex-col gap-6">
            <Input
              type="text"
              placeholder="Ciudad *"
              disabled={loading}
              isRequired
              color="secondary"
              variant="underlined"
              radius="none"
              className="bg-gray-100"
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
          <Button
            radius="full"
            color={loading ? "default" : "secondary"}
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando.." : "REGISTRO"}
          </Button>
          <Button
            variant="light"
            color="secondary"
            type="reset"
            onPress={() => reset()}
          >
            CANCELAR
          </Button>
        </div>
      </form>
    </div>
  );
};
