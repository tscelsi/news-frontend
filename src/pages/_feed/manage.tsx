import React from 'react'
import { type NextPage } from 'next'
import { useForm, type SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import classNames from 'classnames';
import { api } from '~/utils/api';
import type { Outlet } from '@prisma/client';
import Navbar from '~/components/Navbar';
import Select from 'react-select'
import { HiXCircle } from "react-icons/hi";
import Button from '~/components/Button';

type Inputs = {
	name: string
	outlets: {
		prefix: string
		outlet: Omit<Outlet, 'created_at' | 'modified_at'>
	}[]
}

const dummyOutlet = {
	id: "dummy",
	ref: "dummy",
	name: "dummy",
	base_url: "",
}


type Option = {
	label: string
	value: Outlet
}

const Manage: NextPage = () => {
	const utils = api.useContext();
	const feeds = api.feed.list.useQuery(undefined, { refetchOnWindowFocus: false, refetchInterval: false });
	const updateFeed = api.feed.update.useMutation();
	const createFeed = api.feed.create.useMutation();
	const outlets = api.outlet.getAll.useQuery(undefined, { refetchInterval: false });
	const feed = feeds.data ? feeds.data[0] : undefined;
	const { register, reset, control, handleSubmit, watch, formState: { errors } } = useForm({
		defaultValues: {
			name: "",
			outlets: [],
		} as Inputs
	})

	React.useEffect(() => {
		if (feed) {
			reset({
				name: feed?.name, outlets: feed?.outlets.map((outlet) => ({
					prefix: outlet.prefix,
					outlet: outlet.outlet,
				}))
			})
		}
	}, [feed, reset])

	const { fields, remove, append } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "outlets", // unique name for your Field Array
		rules: {
			validate: (value) => value.length > 0 || "At least one outlet is required",
			maxLength: 4,
		}
	});
	console.log(errors)
	console.log(watch('outlets'))

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		// validate that there are no default outlets
		const hasDefaultOutlet = data.outlets.some((outlet) => outlet.outlet.id === dummyOutlet.id)
		if (hasDefaultOutlet) {
			// TODO: pop up snackbar
			console.log("has default outlet!")
			return;
		}
		if (feed) {
			await updateFeed.mutateAsync({
				id: feed?.id,
				...data
			})
			await utils.feed.list.invalidate()
		} else {
			createFeed.mutate(data)
		}
	}

	const options = outlets.data ? outlets.data.map((outlet: Outlet) => ({
		label: outlet.name,
		value: outlet,
	})) : []

	return (
		<div className={classNames("font-satoshi min-h-screen bg-[#F43F5E]")}>
			<Navbar buttonLeftText="back to feed" buttonLeftRoute='/_feed'>Manage my feed</Navbar>
			<div className="flex justify-center items-center">
				<div className=" bg-white border-4 border-black rounded-xl min-w-[66%] min-h-[450px]">
					<div className="m-16">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-2">
								<span className="text-xs font-medium pl-2">Feed name</span>
								<input type="text" className={classNames("pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
									"font-bold": true,
									"font-medium": !true,
								})} {...register('name')} />
							</div>
							{/* <TextField  bolden label="Feed name" /> */}
							<div className="">
								{options.length && fields.map((field, index) => {
									return (
										<div key={field.id} className="mt-12 flex flex-col gap-4">
											<div className="flex gap-2 items-center">
												<h4 className="font-black text-xl">Outlet {index + 1}</h4>
												<HiXCircle onClick={() => remove(index)} size={24} className="fill-red-500 hover:fill-red-400 hover:cursor-pointer" />
											</div>
											<div className="flex flex-col gap-2">
												<span className="text-xs font-medium pl-2">Outlet</span>
												<Controller
													name={`outlets.${index}.outlet`}
													control={control}
													render={({ field: { onChange, value, ref } }) => (
														<Select
															ref={ref}
															value={options.find((option: Option) => {
																console.log(option.value)
																console.log(value)
																console.log(option.value === value)
																return option.value.id === value.id
															})}
															onChange={val => onChange(val?.value)}
															unstyled
															placeholder="Select an option"
															options={options}
															// override option display style
															styles={{
																option: () => ({
																	display: 'flex',
																}),
																noOptionsMessage: () => ({
																	display: 'flex'
																}),
															}}
															classNames={{
																control: (state) => classNames("hover:cursor-pointer bg-white px-3 border-black border-4 rounded-lg h-12 transition-all", {
																	"hover:shadow-blak": !state.menuIsOpen,
																	"hover:shadow-none": state.menuIsOpen,
																	"rounded-b-none": state.menuIsOpen,
																}),
																option: () => "bg-white flex pl-4 justify-start items-center h-12 border-t-0 border-b-2 last:border-b-4 border-black border-4 last:rounded-b-lg hover:bg-gray-100 hover:cursor-pointer",
																placeholder: () => "text-gray-400 font-medium",
																noOptionsMessage: () => "bg-gray-300 flex pl-4 justify-start items-center h-12 border-t-0 text-gray-400 font-medium border-black border-4 rounded-b-lg",
															}}
														/>)} />
											</div>
											<div className="flex flex-col gap-2">
												<span className="text-xs font-medium pl-2">Endpoint</span>
												<input type="text" className={classNames("grow pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
													"font-bold": false,
													"font-medium": !false,
												})} {...register(`outlets.${index}.prefix`)} />
											</div>
											<span className="text-sm text-gray-500">
												{outlets?.data?.find((outlet) => (outlet.id === watch(`outlets.${index}.outlet.id`)))?.base_url}/{watch(`outlets.${index}.prefix`)}
											</span>
											{/* <TextField {...register(`outlets.${index}.prefix`)} label="Endpoint" /> */}
										</div>
									)
								})}
							</div>
							{/* <div className="mt-12 flex flex-col gap-4">
								<h4 className="font-black text-xl">Outlet 1</h4>
								<SelectField options={[]} label="Outlet" />
								<TextField name='' label="Endpoint" />
							</div> */}
							<div className="mt-16 mb-8 text-center">
								<a onClick={() => append({ prefix: "", outlet: dummyOutlet })} className="font-bold text-xl underline hover:cursor-pointer">Add another outlet +</a>
							</div>
							<Button type="submit">Save</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Manage