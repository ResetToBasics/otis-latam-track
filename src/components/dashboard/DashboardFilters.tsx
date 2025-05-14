
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data
const countries = [
  { value: "all", label: "Todos os Países" },
  { value: "br", label: "Brasil" },
  { value: "mx", label: "México" },
  { value: "ar", label: "Argentina" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colômbia" },
  { value: "pe", label: "Peru" }
];

const periods = [
  { value: "month", label: "Este Mês" },
  { value: "quarter", label: "Este Trimestre" },
  { value: "year", label: "Este Ano" },
  { value: "custom", label: "Personalizado" }
];

export function DashboardFilters() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="space-y-1.5">
        <Label htmlFor="country">País</Label>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger id="country" className="w-[160px]">
            <SelectValue placeholder="Selecione o país" />
          </SelectTrigger>
          <SelectContent position="popper">
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="period">Período</Label>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger id="period" className="w-[160px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent position="popper">
            {periods.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>&nbsp;</Label>
        <Button
          variant="outline"
          className={cn(
            "border-dashed border-muted-foreground",
            "flex items-center gap-1.5"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          <span>Calendário</span>
        </Button>
      </div>
    </div>
  );
}
