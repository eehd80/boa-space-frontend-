import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  VStack,
  Box,
  HStack,
} from "@chakra-ui/react";
import {
  Calendar,
  CalendarControls,
  CalendarDate,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarValues,
  CalendarWeek,
} from "@uselessdev/datepicker";
import styled from "styled-components";
import { addDays, addMonths, addWeeks, format, setHours, setMinutes, subDays } from "date-fns";

type DatePickerProps = {
  id: string;
  name: string;
  onChange: any;
};

export const DateRange = {
  ONE_DAY: "1 day",
  THREE_DAY: "3 day",
  ONE_WEEK: "7 day",
  ONE_MONTH: "1 month",
  THREE_MONTHS: "3 months",
  HALF_YEAR: "6 months",
};
// type DR = keyof typeof DateRange;
export default function DatePicker({ id, name, onChange }: DatePickerProps) {
  const [today] = useState<Date>(new Date());
  const [dates, setDates] = useState<any>({
    start: today,
    end: addMonths(today, 1),
  });
  const [visibleText, setVisibleText] = useState("");
  const [currentOption, setCurrentOption] = useState<string | undefined>(DateRange.ONE_MONTH);
  const [isOptionMode, setOptionMode] = useState(true);

  const { startDate, endDate, startTime, endTime } = useMemo(() => {
    if (dates) {
      return {
        startDate: dates?.start,
        endDate: dates?.end,
        startTime: format(dates.start, "HH:mm"),
        endTime: format(dates.end, "HH:mm"),
      };
    }
    return {};
  }, [dates]);

  useEffect(() => {
    if (isOptionMode) {
      setVisibleText(currentOption);
    } else {
      setVisibleText(
        format(dates.start, "yyyy.MM.dd HH:mm") + " - " + format(dates.end, "yyyy.MM.dd HH:mm")
      );
    }
  }, [dates, isOptionMode, currentOption]);

  useEffect(() => {
    if (onChange) onChange({ ...dates });
  }, [onChange, dates]);

  const handlerRangeOptionChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCurrentOption(value);
    setOptionMode(true);
  }, []);

  useEffect(() => {
    if (currentOption === DateRange.ONE_DAY) {
      setDates({ start: today, end: addDays(today, 1) });
    } else if (currentOption === DateRange.THREE_DAY) {
      setDates({ start: today, end: addDays(today, 3) });
    } else if (currentOption === DateRange.ONE_WEEK) {
      setDates({ start: today, end: addWeeks(today, 1) });
    } else if (currentOption === DateRange.ONE_MONTH) {
      setDates({ start: today, end: addMonths(today, 1) });
    } else if (currentOption === DateRange.THREE_MONTHS) {
      setDates({ start: today, end: addMonths(today, 3) });
    } else if (currentOption === DateRange.HALF_YEAR) {
      setDates({ start: today, end: addMonths(today, 6) });
    }
  }, [today, currentOption]);

  const handleSelectDate = (value: CalendarDate | CalendarValues) => {
    setOptionMode(false);
    setCurrentOption(undefined);
    setDates(value);
  };

  const handlerStartTimeChange = (e: any) => {
    const split = e.target.value.split(":");
    const start = setMinutes(setHours(dates.start, Number(split[0])), Number(split[1]));
    setDates({ start, end: dates.end });
  };
  const handlerEndTimeChange = (e: any) => {
    const split = e.target.value.split(":");
    const end = setMinutes(setHours(dates.start, Number(split[0])), Number(split[1]));
    setDates({ start: dates.start, end });
  };

  return (
    <Box className="popover-calendar">
      <Popover variant="black">
        <PopoverTrigger>
          <TextInput
            id={id}
            name={name}
            readOnly
            value={visibleText}
            placeholder="Start date time ~ End date time"
            _placeholder={{ opacity: 0.75, color: "inherit" }}
            h={["58px", "58px", "58px", "50px"]}
          />
        </PopoverTrigger>
        <PopoverContent width="auto" height="auto">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <VStack spacing="25px" padding="15px" align="stretch">
              <FormControl>
                <FormLabel>Date Range</FormLabel>
                <Select
                  value={currentOption}
                  onChange={handlerRangeOptionChange}
                  placeholder="Custom"
                >
                  {Object.keys(DateRange).map((key, index) => {
                    return (
                      <option key={index} value={DateRange[key as keyof typeof DateRange]}>
                        {DateRange[key as keyof typeof DateRange]}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Flex>
                <FormControl>
                  <FormLabel>Starting</FormLabel>
                  <Input
                    width="100%"
                    readOnly
                    value={startDate ? format(startDate, "yyyy.MM.dd") : ""}
                    placeholder="Start Date"
                  />
                </FormControl>
                <CenterDiv>-</CenterDiv>

                <FormControl>
                  <FormLabel>Ending</FormLabel>
                  <Input
                    width="100%"
                    readOnly
                    value={endDate ? format(endDate, "yyyy.MM.dd") : ""}
                    placeholder="End Date"
                  />
                </FormControl>
              </Flex>
              <FormControl className="calendar-form">
                <Calendar
                  value={dates}
                  onSelectDate={handleSelectDate}
                  months={2}
                  highlightToday={true}
                  disablePastDates={subDays(today, 1)}
                >
                  <CalendarControls>
                    <CalendarPrevButton />
                    <CalendarNextButton />
                  </CalendarControls>

                  <CalendarMonths>
                    <HStack spacing="45px" alignItems="flex-start">
                      <CalendarMonth month={0} key={1}>
                        <CalendarMonthName />
                        <CalendarWeek />
                        <CalendarDays />
                      </CalendarMonth>

                      <CalendarMonth month={1} key={2}>
                        <CalendarMonthName />
                        <CalendarWeek />
                        <CalendarDays />
                      </CalendarMonth>
                    </HStack>
                  </CalendarMonths>
                </Calendar>
              </FormControl>
              <Flex>
                <FormControl>
                  <Input
                    width="100%"
                    type="time"
                    min="00:00"
                    value={startTime}
                    onChange={handlerStartTimeChange}
                  />
                </FormControl>
                <CenterDiv2>-</CenterDiv2>
                <FormControl>
                  <Input
                    width="100%"
                    type="time"
                    min="00:00"
                    value={endTime}
                    onChange={handlerEndTimeChange}
                  />
                </FormControl>
              </Flex>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

const TextInput = styled(Input)`
  text-align: left;
  cursor: pointer;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 20px 0 20px;
`;

const CenterDiv2 = styled(CenterDiv)`
  padding: 0 20px;
`;

// const PopoverWrap = styled(Popover)`
//   .cont {
//     background: red;
//   }
// `;
