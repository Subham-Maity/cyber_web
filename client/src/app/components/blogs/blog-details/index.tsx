"use client";
import avatar_1 from "@/assets/images/blog/avatar_01.jpg";
import { getBlogById } from "@/redux/features/admin/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getDate } from "@/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import BlogCommentForm from "../../forms/blog-comment-form";
import BlogSidebar from "../blog-postbox/sidebar";

const BlogDetailsArea = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { blog } = useAppSelector((state) => state.blog);
  const [displayedComments, setDisplayedComments] = useState(3);

  useEffect(() => {
    getBlogById(dispatch, id);
  }, [id]);
  const item = blog;
  if (!item) return null;
  const date = new Date(item?.createdAt);
  const strDate = date.toDateString();

  const handleSeeMoreClick = () => {
    // Increase the number of displayed comments when "See More" is clicked
    setDisplayedComments(item.comments.length);
  };


  return (
    <section className="blog-section pt-100 lg-pt-80">
      <div className="container">
        <div className="border-bottom pb-160 xl-pb-130 lg-pb-80">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-page pe-xxl-5 me-xxl-3">
                <article className="blog-details-meta">
                  <div className="blog-pubish-date">
                    {getDate(strDate)} . By{" "}
                    <a href="#">{item.createdBy.name}</a>
                  </div>
                  <h2 className="blog-heading">{item.title}</h2>
                  {/* <div className="img-meta mb-15">
                    <Image src={img_1} alt="blog-img" className="lazy-img" />
                  </div> */}
                  <div
                    className="blog-html-container"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />

                  <div className="bottom-widget border-bottom d-sm-flex align-items-center justify-content-between">
                    <ul className="d-flex tags style-none pb-20">
                      {item.category.map((cat) => (
                        <li>
                          <a href="#">{cat}</a>
                        </li>
                      ))}
                    </ul>
                    {/* <ul className="d-flex share-icon align-items-center style-none pb-20">
                      <li>Share:</li>
                      <li>
                        <a href="#">
                          <i className="bi bi-google"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-instagram"></i>
                        </a>
                      </li>
                    </ul> */}
                  </div>
                </article>
                  <h3 className="blog-inner-title pb-10 pt-4">
                    {item.comments.length} comments
                  </h3>
                <div className="blog-comment-area" style={{ maxHeight: '400px', overflowY: 'auto',paddingTop:"3px" }}>
                  {item.comments.slice(0, displayedComments).map((comment, index) => (
                    <div className="comment d-flex">
                      <Image
                        src={(comment?.userAvatar === "hello" || comment?.userAvatar === "none" || !comment.userAvatar) ? avatar_1 : comment.userAvatar}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="lazy-img user-avatar rounded-circle"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="comment-text">
                        <div className="name fw-500 tx-dark">
                          {comment.userName || ""}
                        </div>
                        <div className="date">{format(comment.timestamp)}</div>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  {item.comments.length > displayedComments && (
                    <button onClick={handleSeeMoreClick} className="btn-two tran3s" style={{marginLeft:'30px'}}>
                      See More..
                    </button>
                  )}
                </div>
                <div className="blog-comment-form">
                  {/* <h3 className="blog-inner-title">Leave A Comment</h3> */}
                  {/* <p>
                    <Link
                      href="/register"
                      className="text-decoration-underline"
                    >
                      Sign
                    </Link>{" "}
                    in to post your comment or signup if you do not have any
                    account.
                  </p> */}
                  <BlogCommentForm blogId={id} />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <BlogSidebar keywords={item.category} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsArea;
