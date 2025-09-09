import { MessageSquareHeart } from 'lucide-react';

export const CommentIcon = ({ commentsCount }: { commentsCount: number }) => {
  return (
    <div className="flex gap-1 relative">
      <div className="p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 hover:bg-red-200 ">
        <MessageSquareHeart size={58} className="text-red-600 opacity-60" />
      </div>

      {commentsCount && (
        <span className=" absolute right-[-5px] bg-red-600  text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
          {commentsCount}
        </span>
      )}
    </div>
  );
};
