import React from 'react'
import { useForm, type SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import classNames from 'classnames';
import type { NextPage, GetServerSideProps } from 'next'
import { getServerAuthSession } from '~/server/auth';
import { api } from '~/utils/api';
import type { Outlet } from '@prisma/client';
import Navbar from '~/components/molecules/Navbar';
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getServerAuthSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
};


const Manage: NextPage = () => {
	const utils = api.useContext();
	const feeds = api.feed.list.useQuery(undefined, { refetchOnWindowFocus: false, refetchInterval: false });
	const outlets = api.outlet.getAll.useQuery(undefined);
	const updateFeed = api.feed.update.useMutation();
	const createFeed = api.feed.create.useMutation();
	const feed = feeds.data ? feeds.data[0] : undefined;
	const { register, reset, control, handleSubmit, watch, formState: { errors }, setError } = useForm<Inputs>({
		defaultValues: {
			name: "",
			outlets: [],
		}
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
			minLength: 1,
		}
	});

	console.log(errors)

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		// validate that there are no default outlets
		const hasDefaultOutlet = data.outlets.some((outlet) => outlet.outlet.id === dummyOutlet.id)
		if (hasDefaultOutlet && Object.keys(errors).length === 0) {
			setError("outlets", {
				type: "manual",
				message: "Please select an outlet"
			})
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

	console.log(watch('outlets.4.outlet'))

	return (
		<div className={classNames("font-satoshi min-h-screen bg-[#F43F5E]")}>
			<Navbar buttonLeftText="back to feed" buttonLeftRoute='/feed'>Manage my feed</Navbar>
			<div className="flex justify-center items-center">
				<div className=" bg-white border-4 border-black rounded-xl min-w-[66%] min-h-[450px]">
					<div className="m-16">
						{!feeds.isLoading && !outlets.isLoading && options ? (
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col gap-2">
									<span className="text-xs font-medium pl-2">Feed name</span>
									<input type="text" className={classNames("pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
										"font-bold": true,
										"font-medium": !true,
										"border-red-500": errors.name,
										"hover:shadow-red": errors.name,
										"focus:outline-red-500": errors.name,
									})} {...register('name', {
										minLength: 5,
									})} />
									{errors.name?.type === 'minLength' && <span className="text-red-500 text-xs" role="alert">Feed name must be greater than 4 characters</span>}
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
														name={`outlets.${index}.outlet` as const}
														control={control}
														render={({ field: { onChange, value, ref } }) => (
															<Select
																ref={ref}
																value={options.find((option: Option) => {
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
												{watch(`outlets.${index}.outlet`).name !== 'dummy' && <div className="flex flex-col gap-2"><div className="flex flex-col gap-2">
													<span className="text-xs font-medium pl-2">Endpoint</span>
													<input type="text" className={classNames("grow pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
														"font-bold": false,
														"font-medium": !false,
														"border-red-500": errors?.outlets && errors.outlets[index],
														"hover:shadow-red": errors?.outlets && errors.outlets[index],
														"focus:outline-red-500": errors?.outlets && errors.outlets[index],
													})} {...register(`outlets.${index}.prefix`, {
														required: true,
														disabled: watch(`outlets.${index}.outlet`).name === 'dummy',
													})} />
													{errors?.outlets && errors.outlets[index]?.prefix?.type === 'required' && <span className="text-red-500 text-xs" role="alert">Outlet endpoint must be filled out</span>}
												</div>
													<span className="text-sm text-gray-500">
														{outlets?.data?.find((outlet) => (outlet.id === watch(`outlets.${index}.outlet`).id))?.base_url}{`/${watch(`outlets.${index}.prefix`)}`}
													</span>
												</div>}
												{/* <TextField {...register(`outlets.${index}.prefix`)} label="Endpoint" /> */}
											</div>
										)
									})}
								</div>
								<div className="mt-16 mb-8 text-center">
									<a onClick={() => append({ prefix: "", outlet: dummyOutlet })} className="font-bold text-xl underline hover:cursor-pointer hover:text-gray-700">Add another outlet +</a>
								</div>
								<Button type="submit">Save</Button>
								{errors.outlets && errors.outlets.length === 0 && <span className="text-red-500 text-sm self-start" role="alert">{errors.outlets?.message ?? "You must create at least one outlet!"}</span>}
							</form>) : <div>loading...</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Manage