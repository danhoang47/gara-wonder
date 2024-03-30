import { useAppDispatch, useAsyncList } from "@/core/hooks";
import { getMessages } from "@/api/chat";
import { Message, Paging } from "@/core/types";
import { receivedMessages } from "@/features/chat/rooms.slice";

const DEFAULT_PAGING: Paging = {
    limit: 20,
};

export default function useMessages(roomId: string) {
    const dispatch = useAppDispatch();
    const { isLoading, isReload, onNext } = useAsyncList<Message>(
        roomId,
        (messages) => {
            dispatch(
                receivedMessages({
                    roomId,
                    messages,
                }),
            );
        },
        [roomId],
        async (params) => {
            const paging = params[1];
            return getMessages(roomId, paging.limit!, paging.cursor);
        },
        DEFAULT_PAGING,
    );

    return { isLoading, isReload, onNext };
}
