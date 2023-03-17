import React from 'react'
import { type NextPage } from 'next'
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Navbar from '~/components/Navbar';
import TextField from '~/components/TextField';
import Select from 'react-select'


export type LabelType = "SAME_EVENT" | "SAME_STORY" | "SAME_TOPIC" | "DIFFERENT";

const Manage: NextPage = () => {
	const router = useRouter();

	return (
		<div className={classNames("font-satoshi min-h-screen bg-[#F43F5E]")}>
			<Navbar buttonLeftText="back to feed" buttonLeftOnClick={() => router.push('/_feed')}>Manage my feed</Navbar>
			<div className="flex justify-center items-center">
				<div className=" bg-white border-4 border-black rounded-xl min-w-[66%] min-h-[450px]">
					<div className="w-1/3 m-16">
						<TextField bolden label="Feed name" />
						<div className="mt-12 flex flex-col gap-4">
							<h4 className="font-black text-xl">Outlet 1</h4>
							<div className="flex flex-col gap-2">
								<span className="text-xs font-medium pl-2">Outlet</span>
								<Select
									unstyled
									placeholder="Select an option"
									options={[{ label: "One", value: "one" }, { label: "Two", value: "two" }]}
									// override option display style
									styles={{
										option: () => ({
											display: 'flex',
										})
									}}
									classNames={{
										control: (state) => classNames("hover:cursor-pointer bg-white px-3 border-black border-4 rounded-lg h-12 transition-all", {
											"hover:shadow-blak": !state.menuIsOpen,
											"hover:shadow-none": state.menuIsOpen,
											"rounded-b-none": state.menuIsOpen,
										}),
										option: () => "bg-white flex pl-4 justify-start items-center h-12 border-t-0 border-b-2 last:border-b-4 border-black border-4 last:rounded-b-lg hover:bg-gray-100 hover:cursor-pointer",
										placeholder: () => "text-gray-400 font-medium",
									}}
								/>
							</div>
							<TextField label="Endpoint" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Manage