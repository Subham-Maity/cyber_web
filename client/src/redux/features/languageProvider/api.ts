import { AppDispatch } from "@/redux/store";
import { fetchLanguageError, fetchLanguageRequest, fetchLanguageSuccess } from "./slice";
import { AxiosError } from "axios";

interface Country {
    languages?: string[];
  }

export const getAllLanguages = async(dispatch:AppDispatch) => {
    dispatch(fetchLanguageRequest());
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries: Country[] = await response.json();
        const uniqueLanguages = Array.from(
          new Set(
            countries
              .map((country) => country.languages || [])
              .flat()
              .filter(Boolean)
          )
        );
        const flattenedValues = Array.from(
          new Set(uniqueLanguages.flatMap((lang) => Object.values(lang)))
        );
        dispatch(fetchLanguageSuccess(flattenedValues))
      } catch (error) {
        const e = error as AxiosError;
        console.error("Error fetching languages:", error);
        dispatch(fetchLanguageError(e.message))
        
      }
}