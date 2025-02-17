"use client";

import {
  useQuery as reactUseQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useQueryExperimental<T>(options: UseQueryOptions) {
  const [data, setData] = useState<T>();

  const { promise, ...queryState } = reactUseQuery(options);

  // promise.then(data => {
  //   setData(data as T);
  // });

  useEffect(() => {
    const init = async () => {
      const responseData = await promise;

      setData(responseData);
    };

    init();
  }, [!!promise]);

  console.log("************ responseData", data);

  return {
    ...queryState,
    ...data,
  };
}
