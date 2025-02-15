import { logData } from './log.types';


type LogBoxProps = {
	logs: logData[]
}
export const LogBox = ({logs}: LogBoxProps) => {
	return ( 
		<div>
			{logs.map(log => <div>log</div>)}
		</div>
	);
}
