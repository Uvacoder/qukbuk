import { createClient } from '@supabase/supabase-js';
import { currentSession, currentUser, userRecipes, filteredBy, totalRecipeCount } from '$lib/store';
import { get } from 'svelte/store';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

const auth = (() => {
	const session = () => {
		const newSession = supabase.auth.session();
		auth.save(auth.user(), newSession);
	};

	const user = () => {
		const newUser = supabase.auth.user();
		return newUser;
	};

	const signUp = async (email, password, name) => {
		const { user, session, error } = await supabase.auth.signUp(
			{
				email: email,
				password: password
			},
			{
				data: {
					name: name
				}
			}
		);

		auth.save(user, session);

		if (error) return error;
	};

	const signIn = async (email, password) => {
		const { user, session, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});

		auth.save(user, session);

		if (error) return error;
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		auth.save(null, null);
		userRecipes.set(null);

		if (error) return error;
	};

	const save = (newUser, newSession) => {
		currentUser.set(newUser);
		currentSession.set(newSession);
	};

	const updateName = async (newName) => {
		const { user, error } = await supabase.auth.update({ data: { name: newName } });
		if (error) {
			return { user, error };
		}
		currentUser.set(user);
		return { user, error };
	};

	const updateEmail = async (newEmail) => {
		const { user, error } = await supabase.auth.update({ email: newEmail });
		if (error) {
			return { user, error };
		}
		currentUser.set(user);
		return { user, error };
	};

	const updatePassword = async (newPassword) => {
		const { user, error } = await supabase.auth.update({ password: newPassword });
		if (error) {
			return { user, error };
		}
		currentUser.set(user);
		return { user, error };
	};

	return {
		user,
		session,
		signUp,
		signIn,
		signOut,
		save,
		updateName,
		updateEmail,
		updatePassword
	};
})();

const database = (() => {
	const fetch = async (amountToLoad) => {
		let addMore = amountToLoad + 5;
		const { data, error, count } = await supabase
			.from('recipes')
			.select('*', { count: 'exact' })
			.range(amountToLoad, addMore)
			.order('created_at', { ascending: false });
		totalRecipeCount.set(count);
		return data;
	};

	const fetchTags = async (searchTag, amountToLoad) => {
		filteredBy.set(searchTag);
		let addMore = amountToLoad + 5;
		const { data, error, count } = await supabase
			.from('recipes')
			.select('*', { count: 'exact' })
			.cs('tags', [searchTag])
			.range(amountToLoad, addMore)
			.order('created_at', { ascending: false });
		if (error) return error;
		totalRecipeCount.set(count);
		return data;
	};

	const fetchPost = async (id) => {
		const { data, error } = await supabase.from('recipes').select('*').eq('id', id);
		return data;
	};

	const post = async (url, title, description, image, tags, ingredients, directions, own) => {
		const id = get(currentUser).id;
		const { data, error } = await supabase.from('recipes').insert([
			{
				user_id: id,
				url: url,
				title: title,
				image: image,
				description: description,
				tags: tags,
				ingredients: ingredients,
				directions: directions,
				own: own
			}
		]);
		return data, error;
	};

	const update = async (recipeId, title, description, image, tags, ingredients, directions) => {
		const { data, error } = await supabase
			.from('recipes')
			.update({
				title: title,
				image: image,
				description: description,
				tags: tags,
				ingredients: ingredients,
				directions: directions
			})
			.match({ id: recipeId });
		return data, error;
	};

	const remove = async (recipeId) => {
		const { data, error } = await supabase.from('recipes').delete().eq('id', recipeId);

		return { data, error };
	};

	return {
		fetch,
		fetchTags,
		fetchPost,
		post,
		update,
		remove
	};
})();

export { auth, database };
