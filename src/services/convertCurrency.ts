import { z } from "zod";

const ratesSchema = z.record(z.number().min(0));

const FrankfurterAPISchema = z.object({
  amount: z.number().min(0),
  base: z.string().length(3),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  rates: ratesSchema,
});

type ConvertCurrencyParams = {
  from: string;
  to: string;
  value: number;
};

const convertCurrency = async ({
  from,
  to,
  value,
}: ConvertCurrencyParams): Promise<number> => {
  const resp = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
  const data = await resp.json();
  const validatedData = FrankfurterAPISchema.safeParse(data);

  if (validatedData.success) {
    const { rates } = validatedData.data;
    const rate = rates[to];
    const convertedAmount = value * rate;

    return convertedAmount;
  } else {
    throw new Error("Invalid currency data");
  }
};

export default convertCurrency;
