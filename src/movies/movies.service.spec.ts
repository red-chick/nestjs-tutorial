import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({ title: "Test Movie", year: 2021, genres: ["Test"] });
    service.create({ title: "Test Movie 2", year: 2022, genres: ["Test"] });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreateLength = service.getAll().length;

      service.create({ title: "Test Movie 3", year: 2023, genres: ["Test"] });

      const afterCreateLength = service.getAll().length;

      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
    });

    it("should throw a NotFoundException", () => {
      const id = 404;
      try {
        service.getOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("delete", () => {
    it("delete a movie", () => {
      const beforeDeleteLength = service.getAll().length;

      service.delete(1);

      const afterDeleteLength = service.getAll().length;

      expect(afterDeleteLength).toBeLessThan(beforeDeleteLength);
    });

    it("should throw a NotFoundException", () => {
      const id = 404;
      try {
        service.delete(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("update", () => {
    it("should update a movie", () => {
      const updateTitle = "Update Title";

      service.update(1, { title: updateTitle });

      const movie = service.getOne(1);

      expect(movie.title).toEqual(updateTitle);
    });

    it("should throw a NotFoundException", () => {
      const id = 404;
      try {
        service.delete(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
