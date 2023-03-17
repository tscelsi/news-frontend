import React from 'react'
import { type NextPage } from 'next'
import { useRouter } from 'next/router';
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import classNames from 'classnames';
import { api } from '~/utils/api';
import type { Outlet } from '@prisma/client';
import Navbar from '~/components/Navbar';
import TextField from '~/components/TextField';
import SelectField from '~/components/SelectField';
import Select from 'react-select'
import { HiXCircle } from "react-icons/hi";

export type LabelType = "SAME_EVENT" | "SAME_STORY" | "SAME_TOPIC" | "DIFFERENT";

const Manage: NextPage = () => {
	const router = useRouter();
	const feeds = api.feed.list.useQuery(undefined, { refetchOnWindowFocus: false, refetchInterval: false });
	const outlets = api.outlet.getAll.useQuery(undefined, { refetchInterval: false });
	const feed = feeds.data ? feeds.data[0] : undefined;
	const { register, reset, control, setValue, getValues } = useForm()
	console.log(feed)
	React.useEffect(() => {
		reset({
			feedname: feed?.name, outlets: feed?.outlets.map((outlet) => ({
				prefix: outlet.prefix,
				outletId: outlet.outletId,
				outletRef: outlet.outletRef,
			}))
		})
	}, [feed, reset])
	const { fields, append, remove } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "outlets", // unique name for your Field Array
	});

	const handleChange = (e: React.FormEvent<HTMLSelectElement>, index: number) => {
		if (outlets.data) {
			const outlet = outlets.data.find((outlet: Outlet) => outlet.id === e.currentTarget.value)
			if (outlet) {
				setValue(`outlets.${index}.outletRef` as const, outlet.ref)
			}
		}
	}
	console.log()

	return (
		<div className={classNames("font-satoshi min-h-screen bg-[#F43F5E]")}>
			<Navbar buttonLeftText="back to feed" buttonLeftOnClick={() => router.push('/_feed')}>Manage my feed</Navbar>
			<div className="flex justify-center items-center">
				<div className=" bg-white border-4 border-black rounded-xl min-w-[66%] min-h-[450px]">
					<div className="m-16">
						<form>
							<div className="flex flex-col gap-2">
								<span className="text-xs font-medium pl-2">Feed name</span>
								<input type="text" className={classNames("pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
									"font-bold": true,
									"font-medium": !true,
								})} {...register('feedname')} />
							</div>
							{/* <TextField  bolden label="Feed name" /> */}
							{outlets?.data && fields.map((field, index) => {
								return (
									<div key={field.id} className="mt-12 flex flex-col gap-4">
										<div className="flex gap-2 items-center">
											<h4 className="font-black text-xl">Outlet {index + 1}</h4>
											<HiXCircle onClick={() => remove(index)} size={24} className="fill-red-500 hover:fill-red-400 hover:cursor-pointer" />
										</div>
										<div className="flex flex-col gap-2">
											<span className="text-xs font-medium pl-2">Outlet</span>
											<Select
												unstyled
												defaultValue={{
													value: getValues(`outlets.${index}.outletId`) as string,
													label: outlets.data.find((outlet) => outlet.id === getValues(`outlets.${index}.outletId`))?.name,
												}}
												placeholder="Select an option"
												options={outlets.data.map((outlet) => ({
													label: outlet.name,
													value: outlet.id,
												}))}
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
											/>
										</div>
										{/* <SelectField options={outlets?.data && outlets.data.map((outlet) => {
											return {
												value: outlet.id,
												label: outlet.name,
											}
										})} label={`Outlet`} /> */}
										<div className="flex flex-col gap-2">
											<span className="text-xs font-medium pl-2">Endpoint</span>
											<input type="text" className={classNames("pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
												"font-bold": false,
												"font-medium": !false,
											})} {...register(`outlets.${index}.prefix`)} />
										</div>
										{/* <TextField {...register(`outlets.${index}.prefix`)} label="Endpoint" /> */}
									</div>
								)
							})}
							{/* <div className="mt-12 flex flex-col gap-4">
								<h4 className="font-black text-xl">Outlet 1</h4>
								<SelectField options={[]} label="Outlet" />
								<TextField name='' label="Endpoint" />
							</div> */}
							<div className="mt-16 text-center">
								<a className="font-bold text-xl underline hover:cursor-pointer">Add another outlet +</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Manage