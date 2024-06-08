import { json, MetaFunction } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { useState } from "react"

import { Card, CardContent } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export const meta: MetaFunction = () => {
  return [
    { title: "BayMed" },
    { description: "BayMed" }
  ]
}

export const loader = async () => {
  return json({ apiUrl: process.env.API_URL })
}

export default function RegisterPatient() {
  const { apiUrl } = useLoaderData<typeof loader>()
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [cpf, setCpf] = useState("")
  const [companionName, setCompanionName] = useState("")
  const [companionDate, setCompanionDate] = useState("")
  const [companionCpf, setCompanionCpf] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>, setState: (value: React.SetStateAction<string>) => void) => {
    const inputDate = e.target.value.replace(/\D/g, '');

    if (inputDate.length <= 2) {
      setState(inputDate);
    } else if (inputDate.length <= 4) {
      setState(`${inputDate.slice(0, 2)}/${inputDate.slice(2)}`);
    } else {
      setState(`${inputDate.slice(0, 2)}/${inputDate.slice(2, 4)}/${inputDate.slice(4, 8)}`);
    }
  }

  const onChangeCpf = (e: React.ChangeEvent<HTMLInputElement>, setState: (value: React.SetStateAction<string>) => void) => {
    const inputCpf = e.target.value.replace(/\D/g, '');

    if (inputCpf.length <= 3) {
      setState(inputCpf);
    } else if (inputCpf.length <= 6) {
      setState(`${inputCpf.slice(0, 3)}.${inputCpf.slice(3)}`);
    } else if (inputCpf.length <= 9) {
      setState(`${inputCpf.slice(0, 3)}.${inputCpf.slice(3, 6)}.${inputCpf.slice(6)}`);
    } else {
      setState(`${inputCpf.slice(0, 3)}.${inputCpf.slice(3, 6)}.${inputCpf.slice(6, 9)}-${inputCpf.slice(9)}`);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col space-y-8">
          <div className="flex flex-col mt-4 space-y-2 -mb-2">
            <h1 className="text-2xl font-bold">Cadastrar um paciente</h1>
            <p className="text-sm">Informe os dados do paciente e do acompanhante do paciente</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite o nome do paciente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data de nascimento</Label>
              <Input
                id="date"
                placeholder="__/__/____"
                maxLength={10}
                value={date}
                onChange={(e) => onChangeDate(e, setDate)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="___.___.___-__"
                maxLength={14}
                value={cpf}
                onChange={(e) => onChangeCpf(e, setCpf)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companion-name">Nome (acompanhante)</Label>
              <Input
                id="companion-name"
                placeholder="Digite o nome do acompanhante"
                value={companionName}
                onChange={(e) => setCompanionName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companion-date">Data de nascimento (acompanhante)</Label>
              <Input
                id="companion-date"
                placeholder="__/__/____"
                maxLength={10}
                value={companionDate}
                onChange={(e) => onChangeDate(e, setCompanionDate)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companion-cpf">CPF (acompanhante)</Label>
              <Input
                id="companion-cpf"
                placeholder="___.___.___-__"
                maxLength={14}
                value={companionCpf}
                onChange={(e) => onChangeCpf(e, setCompanionCpf)}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full text-white">Cadastrar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
