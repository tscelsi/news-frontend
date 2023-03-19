import React from 'react'
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { api } from '~/utils/api';
import type { Outlet } from '@prisma/client';

type Inputs = {
  name: string
  outlets: {
    prefix: string
    outletId: string
    outletRef: string
  }[]
}

const CreateFeed = () => {
  const { register, handleSubmit, control, watch, getValues, setValue } = useForm({
    defaultValues: {
      name: "my-feed",
      outlets: [
        { prefix: "/section/climate", outletId: "", outletRef: "", }
      ]
    }
  });

  const createFeed = api.feed.create.useMutation()
  const onSubmit: SubmitHandler<Inputs> = data => {
    // add outletRef to data
    createFeed.mutate(data)
  }

  const handleChange = (e: React.FormEvent<HTMLSelectElement>, index: number) => {
    if (outlets.data) {
      const outlet = outlets.data.find((outlet: Outlet) => outlet.id === e.currentTarget.value)
      if (outlet) {
        setValue(`outlets.${index}.outletRef` as const, outlet.ref)
      }
    }
  }

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "outlets", // unique name for your Field Array
  });

  const outlets = api.outlet.getAll.useQuery();
  return (
    outlets.isLoading ? <div>Loading...</div> :
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className="flex flex-col">
                <div className="flex gap-2">
                  <select {...register(`outlets.${index}.outletId` as const, {
                    required: true,
                    onChange: (e: React.FormEvent<HTMLSelectElement>) => handleChange(e, index),
                  })}>
                    <option disabled>Select an option</option>
                    {outlets.data?.map((outlet) => (
                      <option key={outlet.id} value={outlet.id}>{outlet.name}</option>
                    ))}
                  </select>
                  <a onClick={() => remove(index)}>Remove</a>
                </div>
                <input type="text" placeholder="Prefix" {...register(`outlets.${index}.prefix` as const, { required: true })} />
              </section>
            </div>
          )
        })}
        <a onClick={() => append({ prefix: "", outletId: "", outletRef: "", })}>Add Outlet</a>
        <input type="submit" />
      </form>
  )
}

export default CreateFeed