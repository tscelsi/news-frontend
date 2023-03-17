import React from 'react'
import { type NextPage } from 'next'
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Navbar from '~/components/Navbar';
import TextField from '~/components/TextField';
import SelectField from '~/components/SelectField';


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
							<SelectField options={[]} label="Outlet" />
							<TextField label="Endpoint" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Manage