const {
	draft: draftPost,
	publish: publishPost
} = require('../../model/post/post');

describe('Post model', () => {
	describe('Post drafting', () => {
		it('draft post', () => {
			const post = draftPost({
				title: 'learn tdd',
				author: 'cherif',
				body: `Lorem ipsum dolor sit amet.`
			});
			expect(post.isDraft()).toBe(true);
			expect(post.isAuthoredBy('cherif')).toBe(true);
		});

		it('can be drafted with tags', () => {
			const post = draftPost({
				title: 'learn tdd',
				author: 'cherif',
				tags: ['TDD', 'DDDesign'],
				body: `Lorem ipsum dolor sit amet.`
			});
			expect(post.isTaggedWith('TDD')).toBe(true);
			expect(post.isTaggedWith('DDDesign')).toBe(true);
		});

		it('can throws when attempt to be published by another than its author', () => {
			const post = draftPost({
				title: 'learn tdd',
				author: 'cherif',
				tags: ['TDD', 'DDDesign'],
				body: `Lorem ipsum dolor sit amet.`
			});
			expect(() => { post.publish('foo') }).toThrow(Error);
		});

		it('can not be drafted if it is already draft', () => {
			const post = draftPost({
				title: 'learn tdd',
				author: 'cherif',
				tags: ['TDD', 'DDDesign'],
				body: `Lorem ipsum dolor sit amet.`
			});
			expect(() => { post.draft('cherif') }).toThrow(Error);
		});

	});

	describe('Post publishing', () => {

		it('publish a post', () => {
			const post = publishPost({
				title: 'learn tdd',
				author: 'cherif',
				body: `Lorem ipsum dolor sit amet.`
			});
			expect(post.isPublished()).toBe(true);
			expect(post.isAuthoredBy('cherif')).toBe(true);
		});

		it('can be published from draft', () => {
			const post = draftPost({
				title: 'learn tdd',
				author: 'cherif',
				tags: ['TDD', 'DDDesign'],
				body: `Lorem ipsum dolor sit amet.`
			});
			post.publish('cherif');
			expect(post.isPublished()).toBe(true);
		});

		it('can not be published if is alredy published', () => {
			const post = publishPost({
				title: 'learn tdd',
				author: 'cherif',
				tags: ['TDD', 'DDDesign'],
				body: `Lorem ipsum dolor sit amet.`
			});
			
			expect(() => { post.publish() }).toThrow(Error);
		});

		it('can be drafted if is published', () => {
			const post = publishPost({
				title: 'learn tdd',
				author: 'cherif',
				tags: ['TDD', 'DDDesign'],
				body: `Lorem ipsum dolor sit amet.`
			});
			post.draft('cherif');
			expect(post.isPublished()).toBe(false);
			expect(post.isDraft()).toBe(true);
		});

		it('Throws when attempt to be drafted by other than its author', () => {
			const post = publishPost({
				title: 'learn tdd',
				author: 'cherif',
				tags: ['TDD', 'DDDesign'],
				body: `Lorem ipsum dolor sit amet.`
			});
			
			expect(() => { post.draft('foo') }).toThrow(Error);
		});
	});

	describe("Tagging", () => {
		it('can be tagged', () => {
			const post = publishPost({
				title: 'learn tdd',
				author: 'cherif',
				body: `Lorem ipsum dolor sit amet.`
			});
			post.tagWith('BDD');
			expect(post.isTaggedWith('BDD')).toBe(true);
		});

		it('removes tags', () => {
			const post = publishPost({
				title: 'learn tdd',
				author: 'cherif',
				body: `Lorem ipsum dolor sit amet.`
			});
			post.tagWith('BDD');
			post.removeTag('BDD');
			expect(post.isTaggedWith('BDD')).toBe(false);
		});
	});
});