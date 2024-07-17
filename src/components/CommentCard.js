import { Card } from "react-bootstrap";

export default function CommentCard({ commentProp }) {
    const { comment, userId } = commentProp;

    return (
        <Card className="my-3">
            <Card.Body className="text-center">
                <p>"{comment}"</p>
                 Reviewer: User{userId}
            </Card.Body>
        </Card>
    );
}