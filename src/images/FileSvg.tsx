const FileSvg = ({ ...props }) => {
  return (
    <svg {...props} viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        fill="#fff"
        d="M10 6.667A6.667 6.667 0 0 1 16.667 0h33.905c1.768 0 3.464.702 4.714 1.953l12.761 12.761A6.667 6.667 0 0 1 70 19.428v53.905A6.667 6.667 0 0 1 63.333 80H16.667A6.667 6.667 0 0 1 10 73.333V6.667Z"
      />
      <path
        fill="#D7D7D7"
        fillRule="evenodd"
        d="M16.667 0A6.667 6.667 0 0 0 10 6.667v66.666A6.667 6.667 0 0 0 16.667 80h46.666A6.667 6.667 0 0 0 70 73.333V19.428a6.667 6.667 0 0 0-1.953-4.714L55.286 1.953A6.667 6.667 0 0 0 50.572 0H16.667Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M50.572 1.667H16.666a5 5 0 0 0-5 5v66.666a5 5 0 0 0 5 5h46.667a5 5 0 0 0 5-5V19.428a5 5 0 0 0-1.464-3.536L54.107 3.131a5 5 0 0 0-3.535-1.464Z"
        clipRule="evenodd"
      />
      <path
        fill="#D7D7D7"
        d="M53.334.599c.72.327 1.382.783 1.952 1.353l12.761 12.762a6.663 6.663 0 0 1 1.354 1.952H58.334a5 5 0 0 1-5-5V.6Z"
      />
      <path
        fill="#9F9F9F"
        fillRule="evenodd"
        d="M25 31.666A1.667 1.667 0 1 0 25 35h30a1.667 1.667 0 0 0 0-3.334H25ZM25 40a1.667 1.667 0 1 0 0 3.333h30A1.667 1.667 0 1 0 55 40H25Zm-1.666 10c0-.92.746-1.667 1.666-1.667h30a1.667 1.667 0 1 1 0 3.333H25c-.92 0-1.666-.746-1.666-1.666ZM25 56.666A1.667 1.667 0 1 0 25 60h20a1.667 1.667 0 1 0 0-3.334H25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default FileSvg;
