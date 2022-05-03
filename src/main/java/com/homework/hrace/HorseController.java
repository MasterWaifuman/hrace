package com.homework.hrace;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/horses")
public class HorseController {
    private final HorseRepository horseRepository;

    public HorseController(HorseRepository horseRepository) {
        this.horseRepository = horseRepository;
    }

    @GetMapping
    public List<Horse> getHorses() {
        return horseRepository.findAll();
        
    }

    @GetMapping("/{id}")
    public Horse getHorse(@PathVariable Long id) {
        return horseRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createHorse(@RequestBody Horse horse) throws URISyntaxException {
        Horse savedHorse = horseRepository.save(horse);
        return ResponseEntity.created(new URI("/horses/" + savedHorse.getId())).body(savedHorse);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateHorse(@PathVariable Long id, @RequestBody Horse horse) {
        Horse currentHorse = horseRepository.findById(id).orElseThrow(RuntimeException::new);
        currentHorse.setName(horse.getName());
        currentHorse.setColor(horse.getColor());
        currentHorse = horseRepository.save(horse);

        return ResponseEntity.ok(currentHorse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRace(@PathVariable Long id) {
        horseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
