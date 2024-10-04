// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import { IUser, ITeam } from "@/lib/types/types";

// // Set up OAuth2 client for Google API
// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
// 	process.env.NEXT_PUBLIC_CLIENT_ID,
// 	process.env.NEXT_PUBLIC_CLIENT_SECRET,
// 	process.env.NEXT_PUBLIC_REDIRECT_URI
// );

// // Set OAuth2 credentials (refresh token)
// oauth2Client.setCredentials({
// 	refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
// });

// // Configure the email transporter with OAuth2
// async function getAccessToken() {
// 	const accessToken = await oauth2Client.getAccessToken();
// 	return accessToken.token;
// }

// export async function sendTeamInvitation(
// 	inviter: IUser,
// 	invitee: string,
// 	team: ITeam
// ) {
// 	const accessToken = await getAccessToken();

// 	const transporter = nodemailer.createTransport({
// 		service: "gmail",
// 		auth: {
// 			type: "OAuth2",
// 			user: process.env.NEXT_PUBLIC_SMTP_USER,
// 			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
// 			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
// 			refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
// 			accessToken: accessToken,
// 		},
// 	});

// 	const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/accept/${team.id}`;

// 	const mailOptions = {
// 		from: process.env.NEXT_PUBLIC_SMTP_USER, // Gmail address as the sender
// 		to: invitee,
// 		subject: `Invitation to join ${team.name}`,
// 		html: `
//       <h1>Team Invitation</h1>
//       <p>${inviter.name} has invited you to join their team "${team.name}".</p>
//       <p>Click the link below to accept the invitation:</p>
//       <a href="${inviteLink}">Accept Invitation</a>
//       <p>If you didn't expect this invitation, you can ignore this email.</p>
//     `,
// 	};

// 	try {
// 		await transporter.sendMail(mailOptions);
// 		console.log(`Invitation sent to ${invitee} for team ${team.name}`);
// 		return true;
// 	} catch (error) {
// 		console.error("Error sending invitation:", error);
// 		return false;
// 	}
// }
