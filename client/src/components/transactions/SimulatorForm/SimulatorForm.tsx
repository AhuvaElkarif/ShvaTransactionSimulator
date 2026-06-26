import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "../../../api/errors";
import { Button } from "../../common/Button/Button";
import { SearchSelect } from "../../common/SearchSelect/SearchSelect";
import { TimePicker } from "../../common/TimePicker/TimePicker";
import { useRegions } from "../../../hooks/useRegions";
import { useSimulateTransaction } from "../../../hooks/useSimulateTransaction";
import { useTransactionForm } from "../../../hooks/useTransactionForm";
import { ResultBanner } from "../ResultBanner/ResultBanner";
import {
  Buttons,
  ErrorText,
  Fields,
  FlexDiv,
  FormBody,
  TimeZonePicker,
} from "./SimulatorForm.styles";
import { ClockIcon } from "../../common/TimePicker/TimePicker.styles";
import clockIcon from "../../../assets/clock-icon.svg";

export const SimulatorForm = () => {
  const { t } = useTranslation();
  const { data: regions, isLoading, isError } = useRegions();
  const form = useTransactionForm();
  const mutation = useSimulateTransaction();

  const [showResult, setShowResult] = useState(false);

  const regionOptions = (regions ?? []).map((r) => ({
    value: r.key,
    label: r.name,
  }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.isValid) {
      mutation.mutate(form.buildRequest());
    }
  };

  useEffect(() => {
    if (mutation.data) {
      setShowResult(true);

      const timer = setTimeout(() => {
        setShowResult(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [mutation.data]);

  return (
    <FormBody onSubmit={handleSubmit} noValidate>
      <Fields>
        <SearchSelect
          label={t("simulator.regionLabel")}
          placeholder={t("simulator.searchPlaceholder")}
          options={regionOptions}
          value={form.region}
          onChange={form.setRegion}
          disabled={isLoading || isError}
        />

        <TimeZonePicker>
          <TimePicker
            label={t("simulator.timeLabel")}
            value={form.time}
            onChange={form.setTime}
          />

          <Buttons>
            <ClockIcon aria-hidden="true">
              <img src={clockIcon} alt="Clock" />
            </ClockIcon>

            <FlexDiv>
              <Button
                type="button"
                variant="ghost"
                onClick={form.resetTimeToNow}
              >
                {t("common.cancel")}
              </Button>

              <Button
                type="submit"
                isLoading={mutation.isPending}
                disabled={!form.isValid}
                fullWidth
                variant="ghost"
              >
                {mutation.isPending
                  ? t("simulator.submitting")
                  : t("common.ok")}
              </Button>
            </FlexDiv>
          </Buttons>
        </TimeZonePicker>
      </Fields>

      {mutation.isError && (
        <ErrorText>
          {getApiErrorMessage(mutation.error, t("common.error"))}
        </ErrorText>
      )}

      {showResult && mutation.data && (
        <ResultBanner result={mutation.data} />
      )}
    </FormBody>
  );
};