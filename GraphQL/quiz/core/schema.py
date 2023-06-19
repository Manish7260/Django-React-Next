import graphene
from graphene_django import DjangoObjectType
from graphene_django import DjangoListField
from .models import Quizzes, Question, Answer, Category
class QuizzesType(DjangoObjectType):
    class Meta:
        model = Quizzes
        fields = ("id", "title", "category")


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ("id", "name", "category_quiz")

    quiz = graphene.List(QuizzesType)

    @staticmethod
    def resolve_quiz(self, info):
        return self.quizzes_set.all()


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        fields = ('title', 'quiz')


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer
        fields = ("question", "answer_text")


class Query(graphene.ObjectType):
    all_questions = graphene.Field(QuestionType, id=graphene.Int())
    all_answer = graphene.List(AnswerType)
    all_category = graphene.List(CategoryType)

    def resolve_all_questions(root, info, id):
        return Question.objects.get(pk=id)

    def resolve_all_answer(root, info):
        return Answer.objects.all()

    def resolve_all_category(root, info):
        return Category.objects.all()


class InsertCategoryMutation(graphene.Mutation):

    class Arguments:
        name = graphene.String(required = True)

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, name):
        category = Category(name=name)
        category.save()
        return InsertCategoryMutation(category=category)


class CategoryMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        name = graphene.String(required=True)

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, name, id):
        category = Category.objects.get(id=id)
        category.name = name
        category.save()
        return CategoryMutation(category=category)


class DeleteCategoryMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, id):
        category = Category.objects.get(id=id)
        category.delete()
        return DeleteCategoryMutation


class InsertAnswerMutation(graphene.Mutation):

    class Arguments:
        question_id = graphene.ID()
        answer_text = graphene.String(required = True)

    answer = graphene.Field(AnswerType)

    @classmethod
    def mutate(cls, root, info, answer_text, question_id):
        question = Question.objects.get(pk=question_id)
        answer = Answer(answer_text=answer_text, question=question)
        answer.save()
        return InsertAnswerMutation(answer=answer)


class Mutation(graphene.ObjectType):
    insert_category = InsertCategoryMutation.Field()
    update_category = CategoryMutation.Field()
    delete_category = DeleteCategoryMutation.Field()

    insert_answer = InsertAnswerMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)