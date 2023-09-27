import { useParams, useNavigate } from "react-router-dom";
import { samplePosts } from "../../assets/photos/samplePosts/samplePosts";
import { useQuery } from "@tanstack/react-query";
import { fetchPostDetails } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";
import { useState } from "react";
import Modal from "../../components/Modal";
import LikeContainer from "../../components/LikeContainer";
import BookmarkContainer from "../../components/BookmarkContainer";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export interface Post {}

const MySinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const navigate = useNavigate();
  const [editPostModalIsOpen, setEditPostModalIsOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchPostDetails(id),
    queryKey: ["posts", "details", id],
    staleTime: 5 * 60 * 1000,
  });

  // const postId = parseInt(id, 10);
  // const post = samplePosts.find((p) => p.id === postId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <img src={SpinnerIcon} alt="" className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    navigate("/error", { replace: true });
    return null;
  }
  console.log(data);
  const {
    userId,
    closeFriendsOnly,
    description,
    likes,
    images,
    tags,
    updatedAt,
    isLiked,
    isBookmarked,
    bookmarks,
  } = data;

  return (
    <div className="flex">
      <div className="w-[500px] p-3">
        <div className="font-primary">
          <div className="w-full h-10 flex gap-2">
            <button
              id="submit__button"
              className="flex items-center justify-center mt-auto mb-[20px] w-[128px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[100px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
              onClick={() => setEditPostModalIsOpen(true)}
            >
              ویرایش پست
            </button>
            <Modal
              isOpen={editPostModalIsOpen}
              onClose={() => setEditPostModalIsOpen(false)}
            >
              {/* editPost Modal */}
              <div className="bg-red-300">editPost Modal</div>
            </Modal>
            <BookmarkContainer
              postId={id}
              isBookmarked={isBookmarked}
              bookmarks={bookmarks}
            />
            <LikeContainer postId={id} isLiked={isLiked} likesCount={likes} />
          </div>
          <div className="flex">
            ماه پیش
            <p>{updatedAt}</p>
          </div>
          <div className="flex justify-end text-right">
            <p className="text-right">{description}</p>
          </div>
          <div className="">
            <ul className="flex">
              {tags.map((tag: { id: string; value: string }) => {
                const { id, value } = tag;
                return (
                  <li key={id}>
                    <div
                      style={{ backgroundColor: getRandomColor() }}
                      className="h-6 flex items-center justify-center rounded-lg p-2 mr-2 mb-2 text-white text-[14px]"
                    >
                      {value}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[488px] h-[488px]">
        <img
          src={images[0].path}
          alt={`Image ${images[0].id}`}
          className="min-h-full min-w-full object-cover m-2 rounded-[24px] bg-red-400"
        />
      </div>
    </div>
  );
};

export default MySinglePost;
