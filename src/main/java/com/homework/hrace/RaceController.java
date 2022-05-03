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
@RequestMapping("/races")
public class RaceController {
    private final RaceRepository raceRepository;

    public RaceController(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    @GetMapping
    public List<Race> getRaces() {
        return raceRepository.findAll();
        
    }

    @GetMapping("/{id}")
    public Race getRace(@PathVariable Long id) {
        return raceRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createRace(@RequestBody Race race) throws URISyntaxException {
        Race savedRace = raceRepository.save(race);
        return ResponseEntity.created(new URI("/races/" + savedRace.getId())).body(savedRace);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateRace(@PathVariable Long id, @RequestBody Race race) {
        Race currentRace = raceRepository.findById(id).orElseThrow(RuntimeException::new);
        currentRace.setPlace(race.getPlace());
        currentRace.setTime(race.getTime());
        currentRace.setHorses(race.getHorses());
        currentRace.setBetId(race.getBetId());
        currentRace.setWinner(race.getWinner());
        currentRace = raceRepository.save(race);

        return ResponseEntity.ok(currentRace);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRace(@PathVariable Long id) {
        raceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
