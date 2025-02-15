import  { useState } from "react";

type Props = {
	query: string
	resposneCallback: (res: string) => void
}

export const ResearchComplimentBox = ({query, resposneCallback}: Props) => {
	const [userInput, setUserInput] = useState("")

	const submit = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === "Enter"){
			resposneCallback(userInput)
		}
	}

	return ( 
		<div>
			{query}
			<input onKeyDown={submit} onChange={(e)=>{setUserInput(e.target.value)}}/>
		</div>
	);
}
