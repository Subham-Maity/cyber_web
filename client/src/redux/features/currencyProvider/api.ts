import { AppDispatch } from "@/redux/store";
import {
  fetchCurrenciesError,
  fetchCurrenciesRequest,
  fetchCurrenciesSuccess,
} from "./slice";
import { AxiosError } from "axios";

interface Currency {
  name: string;
  symbol: string;
  abbreviation:string;
  [key:string]: any
}

interface Country {
  currencies?: Currency;
}


export const getAllCurrencies = async (dispatch: AppDispatch) => {
  dispatch(fetchCurrenciesRequest());
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries: Country[] = await response.json();
    // console.log(countries);


    const currencies = Array.from(
      new Set(
        countries
          .map((country) => country.currencies || [])
          .flat()
          .filter(Boolean)
      )
    );
    // console.log(currencies);
    const flattenedValues = Array.from(
      new Set(currencies.map((item) => {
        const [key]:string[] = Object.keys(item);
        const {name , symbol} = item[key];
        return {
          abbreviation: key,
          name,
          symbol
        }

      }))
    );
    // console.log(flattenedValues);
    
    const currencyNames:any = Array.from(
      new Set(flattenedValues
        .map((currency) => currency.name)),
        (name) => flattenedValues.find((currency) => currency.name === name)
      
    );
    // console.log(currencyNames);
    // const currencyList = Array.from(
    //     new Set(
    //         flattenedValues.map((c)=>c.name)
    //     )
    // )
    // console.log(currencyNames)

    dispatch(fetchCurrenciesSuccess(currencyNames));
  } catch (error) {
    const e = error as AxiosError;
    console.error("Error fetching currencies:", error);
    dispatch(fetchCurrenciesError(e.message));
  }
};
