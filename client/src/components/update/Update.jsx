import { useState } from 'react';
import { makeRequest } from '../../axios';
import './update.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const Update = ({ setOpenUpdate, user }) => {
	const [cover, setCover] = useState(null);
	const [profile, setProfile] = useState(null);
	const [texts, setTexts] = useState({
		email: user.email,
		password: user.password,
		name: user.name,
		city: user.city,
		website: user.website,
	});

	const upload = async (file) => {
		console.log(file);
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res = await makeRequest.post('/upload', formData);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) =>
		setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
	const queryClient = useQueryClient();
	const mutation = useMutation(
		(user) => {
			return makeRequest.put('/users', user);
		},
		{
			onSuccess: () => queryClient.invalidateQueries(['user']),
		}
	);

	const handleClick = async (e) => {
		e.preventDefault();
		let coverUrl;
		let profileUrl;
		coverUrl = cover ? await upload(cover) : user.coverPic;
		profileUrl = profile ? await upload(profile) : user.profilePic;

		mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
		setOpenUpdate(false);
		setCover(null);
		setProfile(null);
	};

	<div className="update">
		<div className="wrapper">
			<h1>Update Your Profile</h1>
			<form>
				<div className="files">
					<label htmlFor="cover">
						<span>Cover Picture</span>
						<div className="imgContainer">
							<img src="" alt="" />
							<CloudUploadIcon className="icon" />
						</div>
					</label>
					<input type="file" id="cover" style={{ display: 'none' }} onChange={() => {}} />
					<label htmlFor="profile">
						<span>Profile Picture</span>
						<div className="imgContainer">
							<img src={''} alt="" />
							<CloudUploadIcon className="icon" />
						</div>
					</label>
					<input
						type="file"
						id="profile"
						style={{ display: 'none' }}
						onChange={() => {}}
					/>
				</div>
				<label>Email</label>
				<input type="text" value={''} name="email" onChange={handleChange} />
				<label>Password</label>
				<input type="text" value={''} name="password" onChange={handleChange} />
				<label>Name</label>
				<input type="text" value={''} name="name" onChange={handleChange} />
				<label>Country / City</label>
				<input type="text" name="city" value={''} onChange={handleChange} />
				<label>Website</label>
				<input type="text" name="website" value={''} onChange={handleChange} />
				<button onClick={handleClick}>Update</button>
			</form>
			<button className="close" onClick={() => {}}>
				close
			</button>
		</div>
	</div>;
};
