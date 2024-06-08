import { useNavigate } from "@remix-run/react"
import { useState } from "react"

import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"

export default function PatientForm() {
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col space-y-8">
        <div className="flex flex-col mt-4 space-y-2 -mb-2">
          <h1 className="text-2xl font-bold">Criar atendimento</h1>
          <p className="text-sm">Informe os dados do paciente e do acompanhante do paciente</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">

          <div className="pt-4">
            <Button type="submit" className="w-full text-white">Cadastrar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
