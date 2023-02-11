import axios from 'axios';

export const getComments = async function getServerSideProps(url: string) {
  const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/api::article.article:${url}?filters[approvalStatus][$eq]=APPROVED`);

	return data;
}